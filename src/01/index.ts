export type Node<T> = {
  value: T,
  next?: Node<T>,
  prev?: Node<T>
}

export class LinkList<T> {
  private head: Node<T | null> = {value: null}

  constructor(private list: T[]) {
    if (this.list.length === 0) {
      throw new Error("数组为空")
    }
    if (this.list.length === 1) {
      this.head.value = this.list[0]
    }
    let lastNode: Node<T> = {value: this.list[this.list.length - 1]}
    for (let i = this.list.length - 2; i >= 0; i--) {
      lastNode = {
        value: this.list[i],
        next: lastNode
      }
    }
    this.head = lastNode
  }

  public get link() {
    return this.head
  }
}

const list = new LinkList<number>([1, 2,3])
console.log(list.link)