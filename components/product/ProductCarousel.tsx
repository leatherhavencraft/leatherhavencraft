"use client";

import { SVG_VIEWBOX } from "@/lib/constants";
import { useScrollAnimationContext } from "@/components/animations/scroll-animation-context";
import { JacketShape } from "@/components/product/ProductSVG";
import { ProductCaption } from "@/components/product/ProductCaption";
import { ProductNavControls } from "@/components/product/ProductNavControls";

export function ProductCarousel() {
  const {
    products,
    svgRef,
    setGroupRef,
    hintVisible,
  } = useScrollAnimationContext();

  return (
    <div className="stage relative overflow-hidden">
      {/* Hidden image preloader to ensure instant zero-latency rendering of all jackets and model */}
      <div className="sr-only" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/scroll-model/model.webp"
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {products.map((p) =>
          p.scrollJacketImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.id}
              src={p.scrollJacketImage}
              alt=""
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          ) : null
        )}
      </div>

      <p className="hint" style={{ opacity: hintVisible ? 1 : 0 }}>
        Scroll to explore collection
      </p>

      {/* ── Center: Main Model & Interactive SVG Layer ── */}
      <div className="relative flex flex-col items-center justify-center [mask-image:linear-gradient(to_bottom,black_0%,black_74%,rgba(0,0,0,0.6)_85%,transparent_97%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_74%,rgba(0,0,0,0.6)_85%,transparent_97%)]">
        <svg
          ref={svgRef}
          className="scene relative z-10"
          viewBox={`0 0 ${SVG_VIEWBOX.width} ${SVG_VIEWBOX.height}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="An atelier model wearing iconic leather jackets that change as you scroll"
        >
          {/* Base Model (stationary real model) */}
          <image
            href="/scroll-model/model.webp"
            x="0"
            y="0"
            width="700"
            height="1200"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Dynamic Jacket Layers animated via useScrollAnimation */}
          <g>
            {products.map((product, index) => (
              <g
                key={product.id}
                ref={(node) => setGroupRef(index, node)}
              >
                {product.scrollJacketImage ? (
                  <image
                    href={product.scrollJacketImage}
                    x="0"
                    y="0"
                    width="700"
                    height="1200"
                    preserveAspectRatio="xMidYMid meet"
                  />
                ) : (
                  <JacketShape product={product} />
                )}
              </g>
            ))}
          </g>
        </svg>


      </div>

      {/* ── Active Jacket Details (Bottom Left) ── */}
      <ProductCaption />

      {/* ── Bottom Center Arrow Synchronization & Counter (02 / 05) ── */}
      <ProductNavControls />
    </div>
  );
}
