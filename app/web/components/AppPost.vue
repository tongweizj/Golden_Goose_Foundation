<template>
  <!--Container-->
  <div class="container mx-auto w-full pt-20 md:max-w-3xl">
    <div
      class="w-full px-4 text-xl leading-normal text-gray-800 md:px-6"
      style="font-family: Georgia, serif"
    >
      <!--Title-->
      <div class="font-sans">
        <p class="text-base font-bold text-green-500 md:text-sm">
          &lt;
          <a
            href="#"
            class="text-base font-bold text-green-500 no-underline hover:underline md:text-sm"
            >BACK TO BLOG</a
          >
        </p>
        <h1
          class="break-normal pb-2 pt-6 font-sans text-3xl font-bold text-gray-900 md:text-4xl"
        >
          Welcome to Minimal Blog
        </h1>
        <p class="text-sm font-normal text-gray-600 md:text-base">
          Published 19 February 2019
        </p>
      </div>

      <!--Post Content-->

      <!--Lead Para-->
      <p class="py-6">
        👋 Welcome fellow
        <a
          class="text-green-500 no-underline hover:underline"
          href="https://www.tailwindcss.com"
          >Tailwind CSS</a
        >
        and miminal monochrome blog fan. This starter template provides a
        starting point to create your own minimal monochrome blog using Tailwind
        CSS and vanilla Javascript.
      </p>

      <p class="py-6">
        The basic blog page layout is available and all using the default
        Tailwind CSS classes (although there are a few hardcoded style tags). If
        you are going to use this in your project, you will want to convert the
        classes into components.
      </p>

      <h1 class="py-2 font-sans">Heading 1</h1>
      <h2 class="py-2 font-sans">Heading 2</h2>
      <h3 class="py-2 font-sans">Heading 3</h3>
      <h4 class="py-2 font-sans">Heading 4</h4>
      <h5 class="py-2 font-sans">Heading 5</h5>
      <h6 class="py-2 font-sans">Heading 6</h6>

      <p class="py-6">
        Sed dignissim lectus ut tincidunt vulputate. Fusce tincidunt lacus
        purus, in mattis tortor sollicitudin pretium. Phasellus at diam posuere,
        scelerisque nisl sit amet, tincidunt urna. Cras nisi diam, pulvinar ut
        molestie eget, eleifend ac magna. Sed at lorem condimentum, dignissim
        lorem eu, blandit massa. Phasellus eleifend turpis vel erat bibendum
        scelerisque. Maecenas id risus dictum, rhoncus odio vitae, maximus
        purus. Etiam efficitur dolor in dolor molestie ornare. Aenean pulvinar
        diam nec neque tincidunt, vitae molestie quam fermentum. Donec ac
        pretium diam. Suspendisse sed odio risus. Nunc nec luctus nisi. Class
        aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Duis nec nulla eget sem dictum elementum.
      </p>

      <ol>
        <li class="py-3">
          Maecenas accumsan lacus sit amet elementum porta. Aliquam eu libero
          lectus. Fusce vehicula dictum mi. In non dolor at sem ullamcorper
          venenatis ut sed dui. Ut ut est quam. Suspendisse quam quam, commodo
          sit amet placerat in, interdum a ipsum. Morbi sit amet tellus
          scelerisque tortor semper posuere.
        </li>
        <li class="py-3">
          Morbi varius posuere blandit. Praesent gravida bibendum neque eget
          commodo. Duis auctor ornare mauris, eu accumsan odio viverra in. Proin
          sagittis maximus pharetra. Nullam lorem mauris, faucibus ut odio
          tempus, ultrices aliquet ex. Nam id quam eget ipsum luctus hendrerit.
          Ut eros magna, eleifend ac ornare vulputate, pretium nec felis.
        </li>
        <li class="py-3">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia Curae; Nunc vitae pretium elit. Cras leo mauris,
          tristique in risus ac, tristique rutrum velit. Mauris accumsan tempor
          felis vitae gravida. Cras egestas convallis malesuada. Etiam ac ante
          id tortor vulputate pretium. Maecenas vel sapien suscipit, elementum
          odio et, consequat tellus.
        </li>
      </ol>

      <blockquote class="my-8 border-l-4 border-green-500 pl-8 italic md:pl-12">
        Example of blockquote - Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet
        ligula.
      </blockquote>

      <p class="py-6">Example code block:</p>
      <pre
        class="rounded bg-gray-900 p-2 font-mono text-base text-white md:p-4"
      >
    <code class="break-words whitespace-pre-wrap">
<!-- &lt;header class="site-header outer"&gt;
&lt;div class="inner"&gt;
{{&gt; "site-nav"}}
&lt;/div&gt;
&lt;/header&gt; -->
    </code>
  </pre>

      <!--/ Post Content-->
    </div>

    <!--Tags -->
    <div class="px-4 py-6 text-base text-gray-500 md:text-sm">
      Tags:
      <a
        href="#"
        class="text-base text-green-500 no-underline hover:underline md:text-sm"
        >Link</a
      >
      .
      <a
        href="#"
        class="text-base text-green-500 no-underline hover:underline md:text-sm"
        >Link</a
      >
    </div>

    <!--Divider-->
    <hr class="mx-4 mb-8 border-b-2 border-gray-400" />

    <!--Subscribe-->
    <div class="container px-4">
      <div
        class="rounded-lg bg-gradient-to-b from-green-100 to-gray-100 p-4 text-center font-sans shadow-xl"
      >
        <h2 class="break-normal text-xl font-bold md:text-3xl">
          Subscribe to my Newsletter
        </h2>
        <h3 class="break-normal text-sm font-bold text-gray-600 md:text-base">
          Get the latest posts delivered right to your inbox
        </h3>
        <div class="w-full pt-4 text-center">
          <form action="#">
            <div class="mx-auto flex max-w-xl flex-wrap items-center p-1 pr-0">
              <input
                type="email"
                placeholder="youremail@example.com"
                class="mr-2 mt-4 flex-1 appearance-none rounded border border-gray-400 p-3 text-gray-600 shadow-md focus:outline-none"
              />
              <button
                type="submit"
                class="mt-4 block flex-1 appearance-none rounded bg-green-500 py-4 text-base font-semibold uppercase tracking-wider text-white shadow hover:bg-green-400 md:inline-block"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- /Subscribe-->

    <!--Author-->
    <div class="flex w-full items-center px-4 py-12 font-sans">
      <img
        class="mr-4 h-10 w-10 rounded-full"
        src="http://i.pravatar.cc/300"
        alt="Avatar of Author"
      />
      <div class="flex-1 px-2">
        <p class="mb-2 text-base text-base font-bold leading-none md:text-xl">
          Jo Bloggerson
        </p>
        <p class="text-xs text-gray-600 md:text-base">
          Minimal Blog Tailwind CSS template by
          <a
            class="text-green-500 no-underline hover:underline"
            href="https://www.tailwindtoolbox.com"
            >TailwindToolbox.com</a
          >
        </p>
      </div>
      <div class="justify-end">
        <button
          class="rounded-full border border-gray-500 bg-transparent px-4 py-2 text-xs font-bold text-gray-500 hover:border-green-500 hover:text-green-500"
        >
          Read More
        </button>
      </div>
    </div>
    <!--/Author-->

    <!--Divider-->
    <hr class="mx-4 mb-8 border-b-2 border-gray-400" />

    <!--Next & Prev Links-->
    <div class="flex content-center justify-between px-4 pb-12 font-sans">
      <div class="text-left">
        <span class="text-xs font-normal text-gray-600 md:text-sm"
          >&lt; Previous Post</span
        ><br />
        <p>
          <a
            href="#"
            class="break-normal text-base font-bold text-green-500 no-underline hover:underline md:text-sm"
            >Blog title</a
          >
        </p>
      </div>
      <div class="text-right">
        <span class="text-xs font-normal text-gray-600 md:text-sm"
          >Next Post &gt;</span
        ><br />
        <p>
          <a
            href="#"
            class="break-normal text-base font-bold text-green-500 no-underline hover:underline md:text-sm"
            >Blog title</a
          >
        </p>
      </div>
    </div>

    <!--/Next & Prev Links-->
  </div>
  <!--/container-->
</template>

<script setup>
import {} from 'vue'
</script>

<style scoped></style>
