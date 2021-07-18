import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'leetcode-front';
  markdown = `
---
\`\`\`java
public static void main() {
  System.out.println("Hello World");
}
\`\`\`
`;
}
