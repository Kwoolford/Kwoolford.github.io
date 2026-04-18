---
layout: default
title: Archive
permalink: /archive/
---
<section class="archive-page wrap">
  <header class="archive-header">
    <p class="hero-kicker"><span class="accent-dot" aria-hidden="true"></span><span>archive</span></p>
    <h1 class="page-title">Everything, chronological</h1>
    <p class="page-lede">All entries — projects and notes together. Filter with the search below.</p>
  </header>

  <div class="archive-controls" style="margin-bottom: 1.5rem;">
    <input id="archive-search" class="search-input" type="search" placeholder="filter by title, tag, status…" autocomplete="off" spellcheck="false">
  </div>

  <div class="card-grid" id="archive-grid" data-grid>
  {%- for p in site.posts -%}
    {%- include project-card.html project=p -%}
  {%- endfor -%}
  </div>
  <p class="archive-empty" id="archive-empty" hidden>no entries match that filter.</p>
</section>
