import * as vscode from "vscode";
import { renderAscii } from "./render";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "bigComment.convert",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const selection = editor.selection;
      const text = editor.document.getText(selection);
      if (!text.trim()) return;

      const ascii = renderAscii(text);

      editor.edit(editBuilder => {
        editBuilder.replace(selection, ascii);
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
