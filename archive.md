---
layout: default
title: Archive
permalink: /archive/
---
<section class="archive-page wrap">
  <header class="archive-page-header">
    <h1 class="post-title">Archive</h1>
    <p class="post-lede">Everything, chronological.</p>
    <input id="archive-search" class="search-input" type="search" placeholder="filter by title, tag, status…" autocomplete="off" spellcheck="false" style="margin-top:1rem;">
  </header>
  <div class="card-grid" id="archive-grid">
    {%- for p in site.posts -%}
      {%- include project-card.html project=p -%}
    {%- endfor -%}
  </div>
  <p class="archive-empty" id="archive-empty" hidden>no entries match that filter.</p>
</section>
