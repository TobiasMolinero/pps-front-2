export function findScrollableParent(el: HTMLElement | null): HTMLElement | null {
  while(el && el.parentElement) {
    const style = getComputedStyle(el.parentElement)
    if(/(auto|scroll)/.test(style.overflowY)) return el.parentElement;
    el = el.parentElement;
  }
  
  return document.body
}