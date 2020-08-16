export function deleteItem (context, index) {
  // axios delete firebase's data
  context.commit('deleteExam', index)
}
