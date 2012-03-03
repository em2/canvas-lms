class IdGatekeepersController < ApplicationController
  def generate
    if (params[:id_gatekeeper][:instance] == "" ||  params[:id_gatekeeper][:stage] == nil)
      flash[:notice] = "Please complete the form."
      redirect_back_or_default(dashboard_url)
    else
      @id_gatekeeper = IdGatekeeper.new
      
    end
  end
  
  def show
    
  end

end
