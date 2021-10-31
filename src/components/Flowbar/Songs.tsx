import {
  IdentificationIcon,
  OfficeBuildingIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { AppDispatch, flowBarSlice } from "../../Store";
import * as holodex from "../../utils/holodex";

function Songs({ setSongsSelected }: { setSongsSelected: Function }) {
  const orgSelectRef = useRef<any>();
  const channelSelectRef = useRef<any>();

  const [orgs, setOrgs] = useState<IOrg[]>([]);
  const [channels, setChannels] = useState<IChannelByOrg[]>([]);

  useEffect(() => {
    holodex.getOrgs().then((e) => setOrgs(e));
    holodex.getChannelsByOrg("Hololive").then((e) => setChannels(e));
    document
      .getElementById("orgs_parent")
      .addEventListener("transitionstart", (e: any) => {
        e.target.style.overflow = "hidden";
      });
    document
      .getElementById("channels_parent")
      .addEventListener("transitionstart", (e: any) => {
        e.target.style.overflow = "hidden";
      });
  }, []);

  const orgSelectValueRef = useRef("Hololive");
  const orgSelectOnChange = (e: any) => {
    orgSelectValueRef.current = e.value;
    orgSelectRef.current.blur();
    document.getElementById("orgs_parent").style.width = "32px";
    if (e === null) {
      // ALL
      setChannels([]);
    } else {
      holodex.getChannelsByOrg(e.value).then((e) => setChannels(e));
    }
    resetSelectvValue(channelSelectRef);
  };

  const channelSelectOnChange = (e: any) => {
    console.log(e);
    channelSelectRef.current.blur();
    document.getElementById("channels_parent").style.width = "32px";
    if (e === null) {
      // ALL
      if (orgSelectValueRef.current == null) {
        setSongsSelected(["", ""]);
      } else {
        console.log(orgSelectValueRef.current);
        setSongsSelected([orgSelectValueRef.current, ""]);
      }
    } else {
      const findChannel = channels.find((channel) => channel.name === e.value);
      setSongsSelected(["", findChannel.id]);
    }
  };

  const resetSelectvValue = (selectRef: any) => selectRef.current.clearValue();

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      height: 32,
      minHeight: 32,
    }),
  };

  return (
    <>
      <div
        id="orgs_parent"
        className="w-8 transition-all flex overflow-hidden" //hover:w-52
        onMouseOver={(e: any) => {
          e.stopPropagation();
          document.getElementById("orgs_parent").style.width = `${
            orgSelectRef.current.controlRef.getBoundingClientRect().width + 34
          }px`;
        }}
        onMouseLeave={(e: any) => {
          document.getElementById("orgs_parent").style.width = "32px";
        }}
        onTransitionEnd={(e: any) => {
          if (e.target.getBoundingClientRect().width !== 32) {
            e.target.style.overflow = "visible";
          } else {
            e.target.style.overflow = "hidden";
          }
        }}
      >
        <OfficeBuildingIcon className="w-8 h-8 flex-none" />
        <Select
          ref={orgSelectRef}
          placeholder="ALL"
          className="transition-all duration-75 flex-none m-auto"
          tabIndex={-1}
          isClearable={true}
          isSearchable={true}
          isDisabled={orgs.length === 0 ? true : false}
          defaultValue={{ value: "Hololive", label: "Hololive" }}
          options={orgs.map((org) => {
            return { value: org.name, label: org.name };
          })}
          styles={selectStyles}
          onChange={orgSelectOnChange}
        />
      </div>
      <div
        id="channels_parent"
        className="w-8 transition-all flex overflow-hidden"
        onMouseOver={(e: any) => {
          e.stopPropagation();
          document.getElementById("channels_parent").style.width = `${
            channelSelectRef.current.controlRef.getBoundingClientRect().width +
            34
          }px`;
        }}
        onMouseLeave={(e: any) => {
          document.getElementById("channels_parent").style.width = "32px";
        }}
        onTransitionEnd={(e: any) => {
          if (e.target.getBoundingClientRect().width !== 32) {
            e.target.style.overflow = "visible";
          } else {
            e.target.style.overflow = "hidden";
          }
        }}
      >
        <IdentificationIcon className="w-8 h-8 flex-none" />
        <Select
          ref={channelSelectRef}
          placeholder="ALL"
          className="transition-all duration-75 flex-none m-auto"
          tabIndex={-1}
          isClearable={true}
          isSearchable={true}
          isDisabled={channels.length === 0 ? true : false}
          options={channels.map((channel) => {
            return { value: channel.name, label: channel.name };
          })}
          styles={selectStyles}
          onChange={channelSelectOnChange}
        />
      </div>
    </>
  );
}

function mapStateToProps({}: //   playerSlice: { nowPlaying, count, playlist },
any) {
  return {};
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    setSongsSelected: (v: string[]) =>
      dispatch(flowBarSlice.actions.setSongsSelected(v)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs);
