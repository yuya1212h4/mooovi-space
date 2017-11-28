class UsersController < ApplicationController
  def index
    @user = User.all
  end

  def show
  end

  def search
  end
end
