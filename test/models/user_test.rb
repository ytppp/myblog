require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(name: "user", email: "user@123.com")
  end

  test "should be valid" do
    assert @user.valid?
  end

  test "name should be present" do
    @user.name = "       "
    assert_not @user.valid?
  end

  test "name should not be too long" do
    @user.name = "a" * 51
    assert_not @user.valid?
  end

  test "name should not be too short" do
    @user.name = "a"
    assert_not @user.valid?
  end

  test "email should be present" do
    @user.email = "       "
    assert_not @user.valid?
  end

  test "email should not be too long" do
    @user.email = "a" * 244 + "@example.com"
    assert_not @user.valid?
  end

  test "email should not be too short" do
    @user.email = "a@1.c"
    assert_not @user.valid?
  end

  test "email validation should accept valid address" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org first.last@foo.jp alice+bob@baz.cn]

    valid_addresses.each do |address|
      @user.email = address
      assert @user.valid?, "#{address.inspect} should be valid"
    end
  end

  test "email validation should reject invalid address" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.foo@bar_baz.com foo@bar+baz.com]

    invalid_addresses.each do |address|
      @user.email = address
      assert_not @user.valid?, "#{address.inspect} should be invalid"
    end
  end

  test "email should be unique" do
    dup_user = User.new(name: "user", email: @user.email)
    assert_not dup_user.valid?
  end

end
