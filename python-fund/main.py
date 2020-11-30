#coding=utf-8

import pandas as pd 
import numpy as np 
import scipy.optimize as sco
import seaborn as sns
import matplotlib.pyplot as plt
'''
风险平价计算
'''
def portfolio_optimize(ret_mat,cov_shrink=True,method='risk_parity',max_weight=0.4):
    
    #计算时间窗口长度，取1/4作为加权计算依据。
    T=len(ret_mat)
    t=int(T/4)
    
    #用日收益均值计算年化收益期望。
    exp_ret=ret_mat.mean()*252
    ret_mat=ret_mat.dropna()
    #print(ret_mat)
    #不加权计算协方差
    if cov_shrink==False:
        cov_mat=ret_mat.cov()*252
    #加权计算协方差。
    if cov_shrink==True:
        cov_mat=252*(ret_mat.iloc[:t].cov()*0.1+ret_mat.iloc[t+1:2*t].cov()*0.2
                     +ret_mat.iloc[2*t+1:3*t].cov()*0.3+ret_mat.iloc[3*t:].cov()*0.4)
    #print(cov_mat)
    
    #生成权重序列。初始为[1/k,1/k....1/k]共k个
    k=len(ret_mat.columns)
    if k!=len(cov_mat.columns):
        print(ret_mat,cov_mat)
    weights=np.array(k*[1/float(k)])
    #print(weights)
    #指定计算方程
    def risk_parity(weights):
        #weights向量乘以cov_mat矩阵
        risk_vector=np.dot(weights,cov_mat)
        #计算边际风险
        marginal_risk=weights*risk_vector/np.sqrt(np.dot(weights.T,np.dot(cov_mat,weights)))
        #计算各标的的风险贡献
        TRC=[np.sum((i-marginal_risk)**2) for i in marginal_risk]
        return np.sum(TRC)
    
    #设置范围条件。0,0.3表示每一标的的权重在0-30%之间。
    bnds=tuple((0,max_weight) for x in range(k))
    cons = ({'type':'eq', 'fun': lambda x: sum(x) - 1})
    #计算权重，使总风险最低。
    if method=='risk_parity':
        result=sco.minimize(risk_parity,weights,bounds=bnds,constraints=cons,method='SLSQP')
        
    optimal_weights=pd.Series(index=cov_mat.index,data=result['x'])
    
    return optimal_weights
import pandas as pd
def risk_banlance(start_date,end_date,assets,max_weight,tp='fund'):
    ret_result=pd.DataFrame()
    for asset in assets:
        ret=DataAPI.FundNavGet(secID=asset,beginDate=start_date,endDate=end_date,field=u"endDate,adjNavChgPct",pandas="1")
        ret=ret.set_index(keys='endDate')
        ret.columns=[asset]
        #print(ret)
        if len(ret_result)==0:
            ret_result=ret
        else:
            ret_result=pd.merge(ret_result,ret,left_index=True,right_index=True)
    return portfolio_optimize(ret_result,cov_shrink=True,max_weight=max_weight)


'''
输入：
last_day:datetime,由context.previous_date获得
delta_day:int.时间长度
输出：
start_day,end_day:str，格式：20200101
'''
from datetime import datetime
from datetime import timedelta
def cal_date_window(last_day,delta_day):
    previous_date = last_day.strftime('%Y-%m-%d')
    end_day=last_day.strftime('%Y%m%d')
    delta_day=timedelta(days=60)#计算波动率的日期窗口
    dt_start_day=last_day -delta_day
    start_day=datetime.strftime(dt_start_day,'%Y%m%d')
    return start_day,end_day
