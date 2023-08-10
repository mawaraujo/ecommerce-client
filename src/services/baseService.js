export class BaseService {
  static buildResponse (responseData, responseError) {
    if (responseError) {
      return {
        success: false,
        error: responseError
      }
    }

    return {
      success: true,
      data: responseData
    }
  }
}
