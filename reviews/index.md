---
layout: default
title: Reviews
permalink: /reviews/
---
<main id="site-main" class="site-main site-container">
  <header class="page-header">
    <div class="page-title-stack page-title-bg" data-title="Reviews">
      <h1 class="brand-heading">Reviews</h1>
    </div>
  </header>
  {% assign all = site.reviews | sort: 'date' | reverse %}
  {% assign total = all | size %}
  <div class="post-grid">
    {% for item in all limit:10 %}
      <a class="tile" href="{{ item.url | relative_url }}">
        <h2 class="tile-title">{{ item.title }}</h2>
        {% if item.subtitle %}<p class="tile-meta">{{ item.subtitle }}</p>{% endif %}
        <div class="tile-meta">
          {% if item.author %}<span>{{ item.author }}</span>{% endif %}
          <time datetime="{{ item.date | date: '%Y-%m-%d' }}">{{ item.date | date: '%B %-d, %Y' }}</time>
        </div>
      </a>
    {% endfor %}
  </div>
  {% if total > 10 %}
  <nav class="pager">
    <a class="pager-next" href="{{ '/reviews/page/2/' | relative_url }}">Older reviews →</a>
  </nav>
  {% endif %}
</main>

