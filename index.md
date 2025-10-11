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
      {% if item.collection == 'reviews' %}
      <a class="post-card card-frame {{ angle_class }} card-review" href="{{ item.url | relative_url }}">
        <div class="card-inner">
          <h2 class="card-title">{{ item.title }}</h2>
          <div class="card-bottom">
            <div class="card-left">
              <blockquote class="card-quote">{{ item.quote | default: item.excerpt | default: item.content | strip_html | truncatewords: 24 }}</blockquote>
              <span class="card-actions"><span class="btn-trapezoid">Read More</span></span>
            </div>
            <div class="card-right">
              {% if item.cover %}
              <div class="card-image card-image-square">
                <img src="{{ item.cover | relative_url }}" alt="{{ item.title }}" loading="lazy" />
              </div>
              {% endif %}
            </div>
          </div>
        </div>
      </a>
      {% else %}
      <a class="post-card card-frame {{ angle_class }} card-podcast" href="{{ item.url | relative_url }}">
        <div class="card-inner">
          <div class="card-left">
            <h2 class="card-title">{{ item.title }}</h2>
            {% if item.subtitle %}<p class="card-sub">{{ item.subtitle }}</p>{% endif %}
            <span class="card-actions"><span class="btn-trapezoid">Listen Now</span></span>
          </div>
          <div class="card-right">
            {% if item.cover %}
            <div class="card-image card-image-portrait">
              <img src="{{ item.cover | relative_url }}" alt="{{ item.title }}" loading="lazy" />
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

