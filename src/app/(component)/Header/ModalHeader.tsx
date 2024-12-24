import React,{useState} from "react";

interface ModalHeader{
    activeTab: string,
    setActiveTab: (tabName: string) => void
}