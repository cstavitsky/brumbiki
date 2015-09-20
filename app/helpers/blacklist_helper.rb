module BlacklistHelper
  def blacklist_load
    blacklist = Highscore::Blacklist.load_file "../assets/blacklist.txt"
  end
end
