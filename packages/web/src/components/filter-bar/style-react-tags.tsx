import React from 'react'

const StyleReactTags = () => {
  return (
    <style jsx global>{`
    .react-tags {
      flex: 1;
      display: flex;
      position: relative;

      font-size: 13px;
      font-family: var(--font-monospace);
      line-height: 1.2;

      /* clicking anywhere will focus the input */
      cursor: text;
    }

    .react-tags.is-focused {
      border-color: #B1B1B1;
    }

    .react-tags__selected {
      display: flex;
    }

    .react-tags__selected-tag {
      box-sizing: border-box;
      border: 0;

      background: transparent;
      color: var(--c1-fg);
      cursor: pointer;

      /* match the font styles */
      font-size: inherit;
      font-family: inherit;
      line-height: inherit;
    }

    .react-tags__selected-tag:hover,
    .react-tags__selected-tag:focus {
      border-color: #B1B1B1;
    }

    .react-tags__search {
      flex: 1;
      display: flex;
    }

    .react-tags__search-input {
      flex: 1;

      margin: 0;
      padding: 0;
      border: 0;
      outline: none;

      background: transparent;
      color: var(--c1-fg);

      font-size: inherit;
      font-family: inherit;
      line-height: 40px;
    }

    .react-tags__search-input::-ms-clear {
      display: none;
    }

    .react-tags__suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      min-width: 240px;
      z-index: 10;
    }

    .react-tags__suggestions ul {
      margin: 4px -1px;
      padding: 0;
      list-style: none;

      background: var(--c4-bg);
      color: var(--c4-fg);
      border: 1px solid var(--c1-bg);
    }

    .react-tags__suggestions li {
      border-bottom: 1px solid #ddd;
      padding: 6px 8px;
    }

    .react-tags__suggestions li mark {
      color: inherit;
      text-decoration: underline;
      background: none;
      font-family: inherit;
    }

    .react-tags__suggestions li:hover {
      cursor: pointer;
      background: #eee;
    }

    .react-tags__suggestions li.is-active {
      background: var(--c3-bg);
      color: var(--c3-fg);
    }

    .react-tags__suggestions li.is-disabled {
      opacity: 0.5;
      cursor: auto;
    }
  `}</style>
  )
}

export default StyleReactTags
