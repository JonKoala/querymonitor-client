export const waitWhile = function(wrapper, condition, limit=5, count=0) {
  if (condition() && count < limit)
    return wrapper.vm.$nextTick().then(() => waitWhile(wrapper, condition, limit, count+1));
}
