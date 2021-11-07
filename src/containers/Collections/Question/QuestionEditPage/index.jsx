/**
 *
 * @author MoSkool
 * @version 1.0.0
 * @visibleName Question Edit Mode Component ⁉️
 *
 * Single Question is code editor, code preview and error console. This container fetches a single question
 * This is the edit mode of the question, where edits can happen and only admins can access this for now
 *
 * @returns {<QuestionForm/>} - returns CodeEditor component which renders the rest of the components
 *
 * @see Link [Example Question Page in Edit Mode](https://moskool.com/courses/mo-easy/1/isEditMode)
 */

import React, { useCallback, useEffect, useState } from "react";

import * as ROUTES from "constants/routes";
import { createQuestion, updateQuestion } from "helpers/collectionFirebase";
import Container from "@material-ui/core/Container";
import MoSnackbar from "components/library/MoSnackBar";
import MoBreadcrumbs from "components/library/MoBreadcrumbs";
import Navigation from "components/shared/Navigation";
import QuestionForm from "containers/Collections/Question/QuestionEditPage/QuestionForm";
import useGlobal from "store";

const QuestionEditPage = ({ history, match }) => {
  const [{ authUser, firebase, userRole }] = useGlobal();

  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [snackbarProps, setSnackbarProps] = useState(null);

  const collectionPath = `/courses/${match.params.collection}/${
    match.params.questionId || question.id
  }`;

  const navToQuestionViewPage = useCallback(
    (collectionPath) => {
      history.push(collectionPath);
    },
    [history]
  );

  const onSubmit = useCallback(
    async (event) => {
      // createdAt is only available on existing db items and safe to update
      const id = (await event.createdAt)
        ? updateQuestion(event, firebase, match)
        : createQuestion(authUser, event, firebase, match);
      navToQuestionViewPage(`/courses/${match.params.collection}/${await id}`);

      setSnackbarProps({
        autoHideDuration: 2000,
        isActive: true,
        title: "Saved",
      });
    },
    [authUser, firebase, setSnackbarProps, match, navToQuestionViewPage]
  );

  /* TODO: Move to custom hook */
  useEffect(() => {
    const id = match.params.questionId;
    if (!firebase) {
      return;
    }
    const unsubscribe = firebase
      .getCollectionById(`courses/${match.params.collection}/questions`, id)
      .onSnapshot((snapshot) => {
        if (snapshot.size && id > 0) {
          const question = [];
          snapshot.forEach((doc) =>
            question.push({ ...doc.data(), uid: doc.id })
          );
          try {
            /* Questions can contain special JSON characters that needs to be parsed */
            setQuestion({
              ...question[0],
              question: JSON.parse(question[0].question),
            });
          } catch {
            setQuestion(question[0]);
          }
        } else {
          setQuestion({
            title: "Title goes here",
            label: "Subtitle goes here",
            question: "<h1>Question goes here</h1>",
            answer: "<h1>Answer goes here🎉</h1>",
            language: "html",
          });
        }
        setIsLoading(false);
      });

    return () => {
      unsubscribe();
      setSnackbarProps(null);
    };
  }, [firebase, match]);

  if (!userRole?.isAdmin) {
    // TODO: Navigate to not authorized page
    history.push(ROUTES.SIGN_IN.path);
  }

  if (!match.params) {
    return;
  }

  const breadcrumbsOptions = [
    {
      title: "Back to question",
      url: collectionPath,
    },
  ];

  return (
    <Container maxWidth="xl">
      <Navigation
        authUser={authUser}
        Breadcrumbs={() => (
          <MoBreadcrumbs breadcrumbsOptions={breadcrumbsOptions} />
        )}
        firebase={firebase}
      />
      <QuestionForm
        isLoading={isLoading}
        isCard={false}
        title={question?.title}
        label={question?.label}
        question={question}
        setQuestion={(e) => setQuestion(e)}
        subtitle={question?.subtitle}
        navToQuestionViewPage={() => navToQuestionViewPage()}
        onSubmit={(event) => onSubmit(event)}
      />
      {!isLoading && snackbarProps && (
        <MoSnackbar authUser={authUser} snackbarProps={snackbarProps} />
      )}
    </Container>
  );
};

export default QuestionEditPage;
