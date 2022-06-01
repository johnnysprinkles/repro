import { compile } from 'svelte/compiler';

export default function svgExample() {
  return {
    name: 'svg-example',
    resolveId(id) {
      if (id.match(/star\.svg$/)) {
        return 'virtual:star';
      }
    },
    load(id) {
      if (id == 'virtual:star') {
        return 'export default "unused"';
      }
    },
    transform(_, id, options = {}) {
      if (id == 'virtual:star') {
        let { ssr } = options;

        let code = `
          <svg viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
          </svg>

          <style>
            svg {
              fill: var(--star-color, red);
              display: block;
              width: 100px;
              height: 100px;
            }
          </style>
        `;

        let { js } = compile(code, {
          css: true,
          filename: id,
          hydratable: true,
          namespace: 'svg',
          generate: !!ssr ? 'ssr' : 'dom'
        });

        return js;
      }
      return undefined;
    }
  }
}
