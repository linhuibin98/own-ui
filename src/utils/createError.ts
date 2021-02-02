/*
 * 创建一个报错对象
 * @author linhuibin
 * @date 2020/1/18 13:46
 * */
export class CreateError {
  public tag: string
  /*
   * tag { string }  错误信息标签
   * */
  public constructor(tag: string) {
    this.tag = tag
  }
  /*
   * msg { string }  错误信息
   * */
  public throw(msg: string) {
    const message = `${this.tag}:${msg}`
    throw new Error(message)
  }
  /*
   * msg { string }  错误信息
   * */
  public log(msg: string) {
    const message = `${this.tag}:${msg}`
    console.error(message)
  }
}
