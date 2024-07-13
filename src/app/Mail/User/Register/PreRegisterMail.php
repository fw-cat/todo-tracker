<?php

namespace App\Mail\User\Register;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PreRegisterMail extends Mailable
{
    use Queueable, SerializesModels;

    private $authUrl = "";

    /**
     * Create a new message instance.
     */
    public function __construct(string $authUrl)
    {
        $this->authUrl = $authUrl;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'ユーザ仮登録の確認と認証のお願い',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.user.register.pre-register-mail',
            with: [
                'app_name' => config('const.services.app_name'),
                'auth_url' => $this->authUrl,
                'admin_email' => config('const.services.admin.email'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
