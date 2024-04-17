require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "confirmation" do
    mail = UserMailer.confirmation(users(:one), 'test')

    assert_emails 1 do
      mail.deliver_now
    end

    assert_equal "Confirmation Instructions", mail.subject
    assert_equal [users(:one).email], mail.to
    assert_equal ["no-reply@example.com"], mail.from
    assert_match "/confirmations/test/edit", mail.body.encoded
  end

  test "password reset" do
    mail = UserMailer.password_reset(users(:two), 'token')

    assert_emails 1 do
      mail.deliver_now
    end

    assert_equal "Password Reset Intructions", mail.subject
    assert_equal [users(:two).email], mail.to
    assert_equal ["no-reply@example.com"], mail.from
    assert_match "/passwords/token/edit", mail.body.encoded
  end
end

