<html>
    <head>
    <title>${mail.subject || "ShortMail Message"}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc;
            padding: 30px;
            color: #1e293b;
        }

        h2 {
            margin-bottom: 8px;
            color: #1e40af;
            /* blue-800 */
        }

        .meta {
            margin-bottom: 20px;
            font-size: 14px;
            color: #475569;
            background: #e0f2fe;
            /* blue-100 */
            padding: 10px 15px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
            /* blue-500 */
        }

        .divider {
            border-bottom: 2px solid #3b82f6;
            /* blue-500 */
            margin: 16px 0;
        }

        .message {
            white-space: pre-wrap;
            line-height: 1.6;
            font-size: 15px;
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 13px;
            color: #64748b;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: px;

            img {
                width: 60px;
            }
        }

        .stamp {
            display: inline-block;
            padding: 6px 14px;
            border-radius: 12px;
            font-weight: 600;
            letter-spacing: 0.5px;
            background: #eff6ff;

        }
    </style>
</head>

<body>
    <h2>${mail.subject || "(No Subject)"}</h2>
    <div class="meta">
        <strong>From:</strong> ${mail.from || "unknown@shortmail.com"}<br>
        <strong>To:</strong> ${mail.to || "unknown@shortmail.com"}<br>
        <strong>Date:</strong> ${new Date(mail.createdAt).toLocaleString()}
    </div>

    <div class="divider"></div>

    <div class="message">${mail?.text}</div>

    <div class="footer">
        <img src="/logo.png" />
        <p class="stamp">️Powered by ShortMail</p>
        <p>www.shortmail.com</p>
    </div>
</body>

</html>