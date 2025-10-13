---
layout: default
title: Podcasts
permalink: /podcasts/
---
<main id="site-main" class="site-main site-container">
  <header class="page-header">
    <div class="page-title-stack page-title-bg" data-title="Podcasts">
      <h1 class="page-title">Podcasts</h1>
    </div>
  </header>
  {% assign all = site.podcasts | sort: 'date' | reverse %}
  {% assign total = all | size %}
  <div class="reviews-list">
    {% for item in all limit:10 %}
      <a class="review-row card-frame" href="{{ item.url | relative_url }}">
        <div class="review-row-inner">
          <h2 class="review-row-title">{{ item.title }}</h2>
          {% if item.subtitle %}<p class="review-row-sub">{{ item.subtitle }}</p>{% endif %}
          <div class="review-row-meta">
            {% if item.author %}<span class="review-row-author">{{ item.author }}</span>{% endif %}
            <time class="review-row-date" datetime="{{ item.date | date: '%Y-%m-%d' }}">{{ item.date | date: '%B %-d, %Y' }}</time>
          </div>
          <p class="review-row-excerpt">{{ item.excerpt | default: item.content | strip_html | truncatewords: 24 }}</p>
        </div>
      </a>
    {% endfor %}
  </div>
  {% if total > 10 %}
  <nav class="pager">
    <a class="pager-next" href="{{ '/podcasts/page/2/' | relative_url }}">Older podcasts →</a>
  </nav>
  {% endif %}
</main>

