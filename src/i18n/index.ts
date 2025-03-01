import { messages as jaMessages } from './ja';

type MessagePath = string | string[];

/**
 * 指定されたパスのメッセージを取得する
 * @param path ドット区切りのパス（例: 'errors.auth.default'）またはパスの配列
 * @param locale 言語コード（現在は'ja'のみサポート）
 * @returns 翻訳されたメッセージ、パスが見つからない場合はundefined
 */
export function getMessage(path: string | string[], locale = 'ja'): string | undefined {
  // 現在は日本語のみサポート
  const messages = jaMessages;
  
  // パスを配列に変換
  const pathArray = typeof path === 'string' ? path.split('.') : path;
  
  // パスに従ってメッセージオブジェクトを探索
  let result: any = messages;
  for (const key of pathArray) {
    if (result === undefined || result === null) {
      return undefined;
    }
    result = result[key];
  }
  
  return result;
}

/**
 * 認証エラーメッセージを翻訳する
 * @param errorMessage 元のエラーメッセージ
 * @returns 翻訳されたエラーメッセージ
 */
export function translateAuthError(errorMessage: string): string {
  const translatedMessage = getMessage(['errors', 'auth', errorMessage]);
  return translatedMessage || getMessage('errors.auth.default') || errorMessage;
}
