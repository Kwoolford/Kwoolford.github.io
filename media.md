---
layout: default
title: Media
permalink: /media/
---
{%- assign media_items = site.data.media -%}

<section class="media-page wrap">
  <header class="media-page-header">
    <h1 class="post-title">Media</h1>
    <p class="post-lede">Photos, generated images, and random things worth keeping.</p>
  </header>

  {%- if media_items and media_items.size > 0 -%}
  <div class="media-grid">
    {%- for item in media_items -%}
    <div class="media-grid-item">
      <img src="{{ item.src | relative_url }}" alt="{{ item.alt | default: '' }}" loading="lazy">
      {%- if item.caption -%}
      <p class="media-grid-caption">{{ item.caption }}</p>
      {%- endif -%}
    </div>
    {%- endfor -%}
  </div>
  {%- else -%}
  <p style="color: var(--text-muted);">No media yet. Add entries to <code>_data/media.yml</code> and drop images into <code>assets/media/</code>.</p>
  {%- endif -%}
</section>
