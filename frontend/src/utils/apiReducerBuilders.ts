export const apiReducerBuilder = (builder: any, thunk: any, successCB?: Function) => {
    return builder
      .addCase(thunk.rejected, (state: any, action: any) => {
        state.error = action.payload?.message || action.payload?.error?.message || action.error?.message;
        state.isLoading = false;
      })
      .addCase(thunk.fulfilled, (state: any, action: any) => {
        state.error = null;
        state.isLoading = false;
        if (successCB) {
          successCB(state, action);
        }
      })
      .addCase(thunk.pending, (state: any) => {
        state.error = null;
        state.isLoading = true;
      });
  };