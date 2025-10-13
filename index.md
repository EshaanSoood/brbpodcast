---
layout: default
title: Behind The Beat
---
<main id="site-main" class="site-main">
  <section class="site-container hero-simple" aria-labelledby="hero-title">
    <div class="hero-left">
      <a href="{{ '/' | relative_url }}" aria-label="Home" class="hero-logo">
        <img src="{{ '/assets/images/btb-logo-clean.png' | relative_url }}" alt="{{ site.title }}" />
      </a>
    </div>
    <div class="hero-right">
      <h1 id="hero-title" class="hero-line hero-line-1 text-purple-darkest">Welcome to Behind The Beat.</h1>
      <p class="hero-line hero-line-2">Journalism away from algorithmic noise.</p>
      <p class="hero-line hero-line-3">Come on in!</p>
    </div>
  </section>

  <section class="site-container">
    <div class="post-list">
      {% assign all = site.reviews | concat: site.podcasts %}
      {% assign sorted = all | sort: 'date' | reverse %}
      {% assign angle_classes = "card-angle-9|card-angle-11|card-angle-13|card-angle-16|card-angle-13|card-angle-11" | split: "|" %}
      {% for item in sorted %}
      {% assign idx = forloop.index0 | modulo: angle_classes.size %}
      {% assign angle_class = angle_classes[idx] %}
      {% if item.collection == 'reviews' %}
      <a class="post-card card-frame {{ angle_class }} card-review" href="{{ item.url | relative_url }}" data-vt-link data-vt-name="{{ item.url | slugify }}">
        <div class="card-inner">
          <h2 class="card-title" data-vt-title style="view-transition-name: title-{{ item.url | slugify }}">{{ item.title }}</h2>
          <div class="card-bottom">
            <div class="card-left">
              <blockquote class="card-quote">{{ item.pullquote | default: item.excerpt | default: item.content | strip_html | truncatewords: 24 }}</blockquote>
              <span class="card-actions"><button type="button" class="btn-trapezoid btn-action btn-read" data-vt-action>Read More</button></span>
            </div>
            <div class="card-right">
              {% if item.cover or item.album_cover %}
              <div class="card-image card-image-square" data-vt-image>
                <img src="{{ (item.cover | default: item.album_cover) | relative_url }}" alt="{{ item.album_cover_alt | default: item.title }}" loading="lazy" style="view-transition-name: cover-{{ item.url | slugify }}" />
              </div>
              {% endif %}
            </div>
          </div>
        </div>
      </a>
      {% else %}
      <a class="post-card card-frame {{ angle_class }} card-podcast" href="{{ item.url | relative_url }}" data-vt-link data-vt-name="{{ item.url | slugify }}">
        <div class="card-inner">
          <div class="card-left">
            <h2 class="card-title" data-vt-title style="view-transition-name: title-{{ item.url | slugify }}">{{ item.title }}</h2>
            {% if item.subtitle %}<p class="card-sub">{{ item.subtitle }}</p>{% endif %}
            <span class="card-actions"><button type="button" class="btn-trapezoid btn-action btn-listen" data-vt-action>Listen Now</button></span>
          </div>
          <div class="card-right">
            {% if item.cover %}
            <div class="card-image card-image-portrait" data-vt-image>
              <img src="{{ item.cover | relative_url }}" alt="{{ item.title }}" loading="lazy" style="view-transition-name: cover-{{ item.url | slugify }}" />
            </div>
            {% endif %}
          </div>
        </div>
      </a>
      {% endif %}
      {% endfor %}
    </div>
  </section>
</main>

