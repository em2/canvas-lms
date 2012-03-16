class ClassroomsController < ApplicationController
  def index
    get_context
    add_crumb("Classrooms")
    
    @classrooms = Classroom.all
  end

  def show
    get_context
    @current_classroom = Classroom.find(params[:id])
    
    #add_crumb("Classrooms", classrooms_path)
    add_crumb(@current_classroom.name)
  end

end
