---
layout: default
title: Behind The Beat
---
<main id="site-main" class="site-main">
  <section class="hero px-4 md:px-6 py-8 md:py-12">
    <div class="hero-logo">
      <img src="{{ '/assets/images/btb-logo-clean.png' | relative_url }}" alt="{{ site.title }}" />
    </div>
    <div class="max-w-2xl">
      <h1 class="text-3xl md:text-5xl font-heading leading-tight text-purple-darkest">Heartfelt Reviews & Introspective Interviews.</h1>
      <p class="mt-3 md:mt-4 text-base md:text-lg text-purple-dark">A deep dive  into the albums and artists we truly love.</p>
    </div>
  </section>

  <section class="px-4 md:px-6">
    <div class="post-list">
      {% assign all = site.reviews | concat: site.podcasts %}
      {% assign sorted = all | sort: 'date' | reverse %}
      {% assign angle_classes = "card-angle-9|card-angle-11|card-angle-13|card-angle-16|card-angle-13|card-angle-11" | split: "|" %}
      {% for item in sorted %}
      {% assign idx = forloop.index0 | modulo: angle_classes.size %}
      {% assign angle_class = angle_classes[idx] %}
      <a class="post-card card-frame {{ angle_class }}" href="{{ item.url | relative_url }}">
        {% if item.cover %}
        <div class="card-media">
          <img src="{{ item.cover | relative_url }}" alt="{{ item.title }}" loading="lazy" />
        </div>
        {% endif %}
        <div class="post-card-content">
          <h2 class="post-card-title">{{ item.title }}</h2>
          <div class="post-card-meta">
            <time datetime="{{ item.date | date: '%Y-%m-%d' }}">{{ item.date | date: '%B %-d, %Y' }}</time>
            {% if item.category %}<span>•</span><span class="post-card-category">{{ item.category }}</span>{% endif %}
          </div>
          {% if item.excerpt %}<p class="post-card-excerpt">{{ item.excerpt }}</p>{% endif %}
        </div>
      </a>
      {% endfor %}
    </div>
  </section>
</main>

