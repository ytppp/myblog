class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      # 登入用户，然后重定向到用户的资料页面
    else
      redirect_to login_path, notice: "Invalid email/password combination."
    end
  end

  def logout

  end
end
