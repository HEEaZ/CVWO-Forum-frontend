import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState} from '../../app/store';
import { fetchPost, createComment, deletePost, deleteComment } from './postAPI';
import { SinglePostState, Statuses, CommentFormState, CommentDeleteState } from '../enums';


const initialState: SinglePostState = {
  post: {id: 0, title: "", body: "", user_id: 0, created_at: "", updated_at: "", user: {username: ""}, tags: []},
  status: Statuses.Initial,
};

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched. Thunks are
// // typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const fetchPostAsync = createAsyncThunk(
    'singlePost/fetchPost',
    async (id: number) => {
        const response = await fetchPost(id);
        return response;
    }
)

export const createCommentAsync = createAsyncThunk(
    'singlePost/createComment',
    async (payload: CommentFormState) => {
        const response = await createComment(payload);
        return response;
    }
)

export const deletePostAsync = createAsyncThunk(
  'singlePost/deletePost',
  async (id: number) => {
    const response = await deletePost(id);
    return response;
  }
)

export const deleteCommentAsync = createAsyncThunk(
  'singlePost/deleteComment',
  async (payload: CommentDeleteState) => {
    const response = await deleteComment(payload.postId, payload.commentId);
    return response;
  }
)

export const singlePostSlice = createSlice({
  name: 'singlePost',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(fetchPostAsync.fulfilled, (state, action) => {
        if (action.payload?.status === 200) {
          state.post = action.payload.data;
        }
        state.status = Statuses.UpToDate;
      })
      .addCase(fetchPostAsync.rejected, (state) => {
        state.status = Statuses.Error;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSinglePost = (state: RootState) => state.singlePost.post
export const selectSinglePostStatus = (state: RootState) => state.singlePost.status

export default singlePostSlice.reducer;