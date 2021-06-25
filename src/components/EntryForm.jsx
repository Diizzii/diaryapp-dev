import React from 'react'

const EntryForm = ({ titleLabel, entryTextLabel, submitButtonLabel }) => {
  return (
    <form>
      <div className='form-group'>
        <label htmlFor='title' className='mt-3 mb-2'>
          {titleLabel}
        </label>
        <input type='text' name='title' className='form-control' required />
        <label htmlFor='entryText' className='mt-3 mb-2'>
          {entryTextLabel}
        </label>
        <textarea
          type='text'
          name='entryText'
          className='form-control'
          required
          rows='7'
        />
      </div>
      <button
        type='submit'
        className='btn btn-primary mt-3'
        style={{ marginRight: '1%' }}
      >
        {submitButtonLabel}
      </button>
      <button className='btn btn-secondary mt-3'>Cancel</button>
    </form>
  )
}

export default EntryForm
