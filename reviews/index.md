---
layout: default
title: Reviews
permalink: /reviews/
---
<main id="site-main" class="site-main px-4 md:px-6">
  <header class="tag-header">
    <h1 class="tag-title">Reviews</h1>
  </header>
  {% assign all = site.reviews | sort: 'date' | reverse %}
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
    <a class="pager-next" href="{{ '/reviews/page/2/' | relative_url }}">Older reviews →</a>
  </nav>
  {% endif %}
</main>

