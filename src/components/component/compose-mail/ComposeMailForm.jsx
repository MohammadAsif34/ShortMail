import { ComposeMailFooter } from "./ComposeMailFooter";
import { ComposeMailAttachment } from "./ComposeMailAttachment";

export const ComposeMailForm = ({
  form,
  handleChange,
  handleSubmit,
  loading,
}) => {
  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* To / CC / BCC */}
        <div className="space-y-2">
          <InputField
            type="email"
            label="to"
            placeholder="recipient@example.com"
            value={form.to}
            handleChange={handleChange}
            required={true}
          />
          {/* <InputField
              label="CC"
              placeholder="cc@example.com"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
            />
            <InputField
              label="BCC"
              placeholder="bcc@example.com"
              value={bcc}
              onChange={(e) => setBcc(e.target.value)}
            /> */}
        </div>

        {/* Subject */}
        <InputField
          label="subject"
          value={form.subject}
          placeholder="subjects"
          handleChange={handleChange}
        />

        {/* Email Body */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Type your messege here..."
            className="w-full min-h-sm  bg-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <ComposeMailAttachment />
        <ComposeMailFooter loading={loading} />
      </form>
    </>
  );
};

/* Reusable Input Field */
function InputField({
  label,
  type = "text",
  placeholder,
  value,
  handleChange,
  required = false,
}) {
  return (
    <div className="flex items-center gap-4">
      <label className=" capitalize block text-sm font-medium text-gray-600 mb-1 whitespace-nowrap">
        <span>{label}: </span>
      </label>
      <input
        type={type}
        name={label}
        value={value}
        onChange={handleChange}
        className="w-full bg-gray-200 rounded-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-blue-100"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
