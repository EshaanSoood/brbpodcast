---
layout: default
title: Behind The Beat
---
<main id="site-main" class="site-main">
  <section class="site-container hero-simple" aria-labelledby="hero-title">
    <div class="hero-right">
      <h1 id="hero-title" class="hero-line hero-line-1 text-purple-darkest">Welcome to Behind The Beat.</h1>
    </div>
  </section>

  <section class="site-container">
    <p class="home-intro">We’re just getting started here at Behind The Beat. Feel free to explore around. If you like what you see from our current limited offerings, make sure to subscribe so that you’re the first one to know what’s up.</p>
    <div class="post-list card-list">
      {% assign all = site.reviews | concat: site.podcasts %}
      {% assign sorted = all | sort: 'date' | reverse %}
      {% assign angle_classes = "card-angle-9|card-angle-11|card-angle-13|card-angle-16|card-angle-13|card-angle-11" | split: "|" %}
      {% for item in sorted %}
      {% assign idx = forloop.index0 | modulo: angle_classes.size %}
      {% assign angle_class = angle_classes[idx] %}
      {% if item.collection == 'reviews' %}
      <a class="post-card card-frame {{ angle_class }} card-review" href="{{ item.url | relative_url }}" data-vt-link data-vt-name="{{ item.url | slugify }}">
        <div class="card-grid">
          <h2 class="card-title card-headline" data-vt-title style="view-transition-name: title-{{ item.url | slugify }}">{{ item.title }}</h2>
          <div class="card-meta">{{ item.date | date: '%B %e, %Y' }}</div>
          <div class="card-row">
            <blockquote class="card-quote">{{ item.pullquote | default: item.excerpt | default: item.content | strip_html | truncatewords: 24 }}</blockquote>
            {% if item.cover or item.album_cover %}
            <figure class="card-media" data-vt-image>
              <img src="{{ (item.cover | default: item.album_cover) | relative_url }}" alt="{{ item.album_cover_alt | default: item.title }}" loading="lazy" style="view-transition-name: cover-{{ item.url | slugify }}" />
            </figure>
            {% endif %}
          </div>
          <span class="card-actions"><button type="button" class="btn-trapezoid btn-action btn-peek" data-vt-action>Read More</button></span>
        </div>
      </a>
      {% else %}
      <a class="post-card card-frame {{ angle_class }} card-podcast" href="{{ item.url | relative_url }}" data-vt-link data-vt-name="{{ item.url | slugify }}">
        <div class="card-grid">
          <h2 class="card-title card-headline" data-vt-title style="view-transition-name: title-{{ item.url | slugify }}">{{ item.title }}</h2>
          <div class="card-meta">{{ item.date | date: '%B %e, %Y' }}</div>
          <div class="card-row">
            {% if item.subtitle %}<blockquote class="card-quote">{{ item.subtitle }}</blockquote>{% endif %}
            {% if item.cover %}
            <figure class="card-media" data-vt-image>
              <img src="{{ item.cover | relative_url }}" alt="{{ item.title }}" loading="lazy" style="view-transition-name: cover-{{ item.url | slugify }}" />
            </figure>
            {% endif %}
          </div>
          <span class="card-actions"><button type="button" class="btn-trapezoid btn-action btn-peek" data-vt-action>Listen Now</button></span>
        </div>
      </a>
      {% endif %}
      {% endfor %}
    </div>
  </section>
</main>

