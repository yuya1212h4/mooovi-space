class UsersController < ApplicationController
  def index
    @user = User.all
  end

  def show
  end

  def search
    params[:search] ||= []
    @user = User.where("nickname LIKE(?)", "%#{params[:search]}%")
  end
end
