/* eslint-env jest */
import modalsReducer, {
    closeFeedbackModal,
    modalsInitialState,
    openFeedbackModal
} from '../../../src/reducers/modals';

test('feedback modal is closed by default', () => {
    expect(modalsInitialState.feedbackModal).toBe(false);
});

test('opens and closes the feedback modal', () => {
    const openedState = modalsReducer(modalsInitialState, openFeedbackModal());
    expect(openedState.feedbackModal).toBe(true);

    const closedState = modalsReducer(openedState, closeFeedbackModal());
    expect(closedState.feedbackModal).toBe(false);
});
