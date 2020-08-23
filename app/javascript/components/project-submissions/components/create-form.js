import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";


const CreateForm = (props) => {
  const schema = yup.object().shape({
    repo_url: yup.string().url("Must be a URL"),
    live_preview_url: yup.string().url("Must be a URL"),
  });

  const { register, handleSubmit, formState, errors, reset, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  console.log("just checking changes are being registered")
  console.log("errors", errors)

  const handleClose = () => {
    reset({
      isSubmitted: false,
    })

    props.onClose()
  }

  if (formState.isSubmitted) {
    return (
      <div className="text-center">
        <h1 className="accent">Thanks for Submitting Your Solution!</h1>
        <button className="button button--primary" onClick={handleClose}>Close</button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-center accent">Upload Your Project</h1>

      <form className="form" onSubmit={handleSubmit(props.onSubmit)}>
        <div className="form__section">
          <span className="form__icon fab fa-github"></span>
          <input
            className="form__element form__element--with-icon"
            type="url"
            name="repo_url"
            placeholder="Repository URL"
            ref={register}
          />
        </div>
        {errors.repo_url && <div className="form__error-message push-down"> {errors.repo_url.message}</div> }

        <div className="form__section push-down-3x">
          <span className="form__icon fas fa-link"></span>
          <input
            className="form__element form__element--with-icon"
            type="text"
            placeholder="Live Preview URL"
            name="live_preview_url"
            ref={register}
          />
        </div>
        {errors.live_preview_url && <div className="form__error-message push-down"> {errors.live_preview_url.message}</div> }

        <div className="form__section form__section--right-aligned form__section--bottom">
            <p className="bold">MAKE SOLUTION PUBLIC</p>
            <label className="toggle form__public-checkbox">
              <input className="toggle__input" type="checkbox" name="is_public" ref={register}  />
              <div className="toggle__fill"></div>
            </label>
          <button type="submit" className="button button--primary">Submit</button>
        </div>

      </form>
    </div>
  )
}

export default CreateForm
