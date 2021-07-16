import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'leetcode-front';
  language = 'java';
  markdown = `## Markdown __rulez__!
---
public
### Syntax highlight
\`\`\`java
public static void main() {
  
}
\`\`\`

### Lists
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet

### Blockquote
> Blockquote to the max`;
}
