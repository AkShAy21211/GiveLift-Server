export interface JsonResponse<T> {
  status: true | false;
  message: string;
  data: T;
}

export default JsonResponse;
