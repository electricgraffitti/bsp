class ApplicationController < ActionController::Base
    protect_from_forgery

    before_filter :ensure_proper_protocol
    helper :all
    helper_method :clear_current_sessions, :current_admin, :current_admin_session, :current_teacher, :current_teacher_session, :current_student, :current_student_session, :authorized_admins, :authorized_user, :authorized_admin_or_teacher, :super_admin, :super?

    private

    def clear_current_sessions
      if current_teacher
        current_teacher_session.destroy
      elsif current_admin
        current_admin_session.destroy
      elsif current_student
        current_student_session.destroy
      else
        return
      end
    end

    def ensure_proper_protocol

      if !request.ssl? && ssl_allowed_action?
        redirect_to "https://" + request.host + request.fullpath, :method => request.method, :status => 301
      elsif request.ssl? && !ssl_allowed_action?
        redirect_to "http://" + request.host + request.fullpath, :method => request.method, :status => 301
      else
        # response.headers['Strict-Transport-Security'] = 'max-age=0'
      end
    end


    # These elsifs are set to not do the redirect on create and the discount code check. It breaks if the protocol changes
    def ssl_allowed_action?
      if Rails.env == "development"
        return false
      else
        if params[:controller] == 'purchases' && params[:action] == 'new'
          return true
        elsif params[:controller] == 'purchases' && params[:action] == 'create'
          return true
        elsif params[:controller] == "ajax" && params[:action] == "discount_code_check"
          return true
        else
          return false
        end
      end
    end
  
    def current_student_session
      return @current_student_session if defined?(@current_student_session)
      @current_student_session = StudentSession.find
    end
    
    def current_student
      return @current_student if defined?(@current_student)
      @current_student = current_student_session && current_student_session.record
    end
    
    def require_student
      unless current_student
        flash[:notice] = "You must be logged in to access this page"
        redirect_to new_student_session_url
        return false
      end
    end

    def require_no_student
      if current_student
        flash[:notice] = "You must be logged out to access this page"
        redirect_to root_path
        return false
      end
    end
  
    def current_teacher_session
      return @current_teacher_session if defined?(@current_teacher_session)
      @current_teacher_session = TeacherSession.find
    end

    def current_teacher
      return @current_teacher if defined?(@current_teacher)
      @current_teacher = current_teacher_session && current_teacher_session.record
    end
    
    def require_auth
      unless current_teacher || current_student || current_admin
        flash[:notice] = "You must be logged in to access this page"
        redirect_to root_url
        return false
      end
    end
    
    def require_teacher
      unless current_teacher || current_admin
        flash[:notice] = "You must be logged in to access this page"
        redirect_to new_teacher_session_url
        return false
      end
    end

    def require_no_teacher
      if current_teacher
        flash[:notice] = "You must be logged out to access this page"
        redirect_to root_path
        return false
      end
    end
    
    def current_admin_session
      return @current_admin_session if defined?(@current_admin_session)
      @current_admin_session = AdminSession.find
    end

    def current_admin
      return @current_admin if defined?(@current_admin)
      @current_admin = current_admin_session && current_admin_session.record
    end

    def require_admin
      unless current_admin
        flash[:notice] = "You must be logged in to access this page"
        redirect_to new_admin_session_url
        return false
      end
    end

    def require_no_admin
      if current_admin
        flash[:notice] = "You must be logged out to access this page"
        redirect_to root_path
        return false
      end
    end

    def authorized_admins
      unless current_admin
        flash[:notice] = "You must be logged in to access this page"
        redirect_to new_admin_session_url
        return false
      end
    end

    def authorized_admin_or_teacher
      unless current_teacher || current_admin
        flash[:notice] = "You must be logged in to access this page"
        redirect_to new_teacher_session_url
        return false
      end
    end

    def authorized_user
      unless current_student || current_teacher || current_admin
        flash[:notice] = "You must be logged in to access this page"
        redirect_to new_teacher_session_url
        return false
      end
    end

    protected

    def super_admin
      unless super?
        return false
      end
    end

    def super?
      authenticate_or_request_with_http_basic do |username, password|
        username == APP['super_user'] && password == APP['super_pass']
      end
    end

end
