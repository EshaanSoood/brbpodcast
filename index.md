---
layout: default
title: Behind The Beat
---
<main id="site-main" class="site-main">
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-inner">
      <div>
        <h1 id="hero-title" class="hero-title">Welcome to Behind The Beat.</h1>
        <p class="hero-kicker">Journalism away from algorithmic noise.</p>
      </div>
      <div class="hero-anim" aria-hidden="true"></div>
    </div>
  </section>

  <section class="site-container">
    <p class="home-intro">We’re just getting started here at Behind The Beat. Feel free to explore around. If you like what you see from our current limited offerings, make sure to subscribe so that you’re the first one to know what’s up.</p>
    <div class="post-grid overlap-grid snap-viewport">
      {% assign all = site.reviews | concat: site.podcasts %}
      {% assign sorted = all | sort: 'date' | reverse %}
      {% assign angle_classes = "card-angle-9|card-angle-11|card-angle-13|card-angle-16|card-angle-13|card-angle-11" | split: "|" %}
      {% for item in sorted %}
      {% assign idx = forloop.index0 | modulo: angle_classes.size %}
      {% assign angle_class = angle_classes[idx] %}
      {% if item.collection == 'reviews' %}
      <a class="postcard postcard--review snap-card" href="{{ item.url | relative_url }}" data-vt-link data-vt-name="{{ item.url | slugify }}">
        <h2 class="postcard-title" data-vt-title style="view-transition-name: title-{{ item.url | slugify }}">{{ item.title }}</h2>
        <p class="postcard-body">{{ item.pullquote | default: item.excerpt | default: item.content | strip_html | truncatewords: 24 }}</p>
        {% if item.cover or item.album_cover %}
        <div data-vt-image>
          <img src="{{ (item.cover | default: item.album_cover) | relative_url }}" alt="{{ item.album_cover_alt | default: item.title }}" loading="lazy" style="view-transition-name: cover-{{ item.url | slugify }}" />
        </div>
        {% endif %}
        <span class="postcard-action">Read More</span>
      </a>
      {% else %}
      <a class="postcard postcard--podcast snap-card" href="{{ item.url | relative_url }}" data-vt-link data-vt-name="{{ item.url | slugify }}">
        <h2 class="postcard-title" data-vt-title style="view-transition-name: title-{{ item.url | slugify }}">{{ item.title }}</h2>
        {% if item.subtitle %}<p class="postcard-meta">{{ item.subtitle }}</p>{% endif %}
        {% if item.cover %}
        <div data-vt-image>
          <img src="{{ item.cover | relative_url }}" alt="{{ item.title }}" loading="lazy" style="view-transition-name: cover-{{ item.url | slugify }}" />
        </div>
        {% endif %}
        <span class="postcard-action">Listen Now</span>
      </a>
      {% endif %}
      {% endfor %}
    </div>
  </section>
</main>

