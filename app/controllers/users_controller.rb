class UsersController < ApplicationController

  def index
    @user = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def search
    params[:search] ||= []
    @user = User.where("nickname LIKE(?)", "%#{params[:search]}%")
  end

end
