require 'open-uri'
require 'open_uri_redirections'

class Link

  attr_reader :title

  def initialize(url)
    @url = url
    @title = self.grab_title
  end

  def grab_title
    begin
      body = open(@url, :allow_redirections => :all).read
    rescue => e
      case e
      when OpenURI::HTTPError
        return @url
      when SocketError
        return @url
      else
        raise e
      end
    end

    begin
      doc = Oga.parse_html(body)
    rescue => e
      return @url
    end

    title = doc.at_css('title')

    title ? title.text : @url
  end

end
