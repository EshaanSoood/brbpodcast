---
layout: default
title: Reviews
permalink: /reviews/
---
<main id="site-main" class="site-main site-container">
  <header class="page-header">
    <div class="page-title-stack page-title-bg" data-title="Reviews">
      <h1 class="page-title">Reviews</h1>
    </div>
  </header>
  {% assign all = site.reviews | sort: 'date' | reverse %}
  {% assign total = all | size %}
  <div class="card-grid">
    {% for item in all limit:10 %}
      <a class="card" href="{{ item.url | relative_url }}">
        <div>
          <h2 class="card-headline">{{ item.title }}</h2>
          {% if item.subtitle %}<p class="card-subtitle">{{ item.subtitle }}</p>{% endif %}
          <div class="card-meta">
            {% if item.author %}<span class="card-author">{{ item.author }}</span>{% endif %}
            <time class="card-date" datetime="{{ item.date | date: '%Y-%m-%d' }}">{{ item.date | date: '%B %-d, %Y' }}</time>
          </div>
          <p class="card-excerpt">{{ item.excerpt | default: item.content | strip_html | truncatewords: 24 }}</p>
        </div>
      </a>
    {% endfor %}
  </div>
  {%- comment -%}
  Pagination disabled for now. GitHub Pages does not generate page/2 without a plugin.
  {%- endcomment -%}
</main>

