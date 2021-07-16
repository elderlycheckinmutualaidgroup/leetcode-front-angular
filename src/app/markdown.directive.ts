import { Directive, Input, OnChanges, ElementRef } from '@angular/core';
const marked = require('marked');

@Directive({
  selector: '[markdown]',
})
export class MarkdownDirective implements OnChanges {
  @Input() text: any;
  constructor(public elementRef: ElementRef) {
    this.text = '';
  }

  ngOnChanges() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code: any, lang: any) {
        const hljs = require('highlight.js');
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
    this.elementRef.nativeElement.innerHTML = marked.parse(marked(this.text));
  }
}
