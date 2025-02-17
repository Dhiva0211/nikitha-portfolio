interface ApiResponse {
  readonly data: unknown;
  readonly error: string | null;
  readonly message: string | null;
  readonly location: string | null;
}

interface ApiSelectOption {
  readonly valueId: string;
  readonly name: string;
}

export default ApiResponse;
export type { ApiSelectOption };
