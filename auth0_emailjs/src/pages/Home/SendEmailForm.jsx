import { useContext } from "react";
import { HomeContext } from ".";

function SendEmailForm() {
  const { form, formRef, handleChangeForm, handleSubmitForm } =
    useContext(HomeContext);
  const sendEmail = (e) => {
    e.preventDefault();
    handleSubmitForm();
  };

  return (
    <form ref={formRef} onSubmit={sendEmail} className="w-100 space-y-3">
      <div className="space-y-1">
        <label className="font-bold" htmlFor="name">
          Name
        </label>
        <div>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name..."
            value={form.name ?? ""}
            onChange={handleChangeForm}
            className="w-full px-2 py-1 border border-solid border-black outline-none rounded"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="font-bold" htmlFor="email">
          Email
        </label>
        <div>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={form.email ?? ""}
            onChange={handleChangeForm}
            className="w-full px-2 py-1 border border-solid border-black outline-none rounded"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="font-bold" htmlFor="message">
          Message
        </label>
        <div>
          <textarea
            rows={5}
            id="message"
            name="message"
            placeholder="Enter your message..."
            value={form.message ?? ""}
            onChange={handleChangeForm}
            className="w-full px-2 py-1 border border-solid border-black outline-none rounded resize-none"
          ></textarea>
        </div>
      </div>
      <button className="bg-red-500 text-white font-bold w-full text-center h-11 rounded-full hover:bg-opacity-80 mt-2">
        Send message
      </button>
    </form>
  );
}

export default SendEmailForm;
