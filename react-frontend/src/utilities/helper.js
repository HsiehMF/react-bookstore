export const formatPrice = cents => {
  return (cents / 10).toLocaleString('zh-tw', {
    style: 'currency',
    currency: 'TWD'
  })
}
